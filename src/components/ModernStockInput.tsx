import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useStockSearch, SearchResult } from '../hooks/useStockSearch';

interface ModernStockInputProps {
  value: string;
  onChange: (value: string) => void;
  onStockSelect?: (code: string, name: string) => void;
  disableAutoDropdown?: boolean;
  autoSelectFirst?: boolean;
}

export default function ModernStockInput({ value, onChange, onStockSelect, disableAutoDropdown = false, autoSelectFirst = false }: ModernStockInputProps) {
  const { search, isLoading } = useStockSearch();
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [dropdownPosition, setDropdownPosition] = useState({ left: 0, top: 0, width: 0 });
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const hasAutoSelectedRef = useRef<boolean>(false);

  const ITEMS_PER_PAGE = 5;

  useEffect(() => {
    if (value.trim().length > 0) {
      const results = search(value);
      setSearchResults(results);

      const isFullyFormatted = /^\d{4}\s+.+/.test(value);

      if (disableAutoDropdown || isFullyFormatted) {
        setShowDropdown(false);
      } else {
        setShowDropdown(results.length > 0);
      }

      setCurrentPage(0);

      // Auto-select first result if enabled and not already selected
      if (autoSelectFirst && results.length > 0 && !hasAutoSelectedRef.current && !isFullyFormatted) {
        const firstResult = results[0];
        hasAutoSelectedRef.current = true;

        // Use setTimeout to ensure the selection happens after the state updates
        setTimeout(() => {
          handleStockClick(firstResult);
        }, 0);
      }
    } else {
      setSearchResults([]);
      setShowDropdown(false);
      setCurrentPage(0);
      hasAutoSelectedRef.current = false;
    }
  }, [value, search, disableAutoDropdown, autoSelectFirst]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const updatePosition = () => {
      if (inputRef.current) {
        const rect = inputRef.current.getBoundingClientRect();
        setDropdownPosition({
          left: rect.left,
          top: rect.bottom + 8,
          width: rect.width
        });
      }
    };

    if (showDropdown) {
      updatePosition();
      window.addEventListener('resize', updatePosition);

      return () => {
        window.removeEventListener('resize', updatePosition);
      };
    }
  }, [showDropdown]);

  useEffect(() => {
    const handleScroll = () => {
      if (showDropdown) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      window.addEventListener('scroll', handleScroll, true);
      return () => {
        window.removeEventListener('scroll', handleScroll, true);
      };
    }
  }, [showDropdown]);

  const totalPages = Math.ceil(searchResults.length / ITEMS_PER_PAGE);
  const startIndex = currentPage * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentResults = searchResults.slice(startIndex, endIndex);

  const handleStockClick = (stock: SearchResult) => {
    const displayValue = `${stock.code} ${stock.name}`;
    onChange(displayValue);
    setShowDropdown(false);

    if (onStockSelect) {
      onStockSelect(stock.code, stock.name);
    }
  };

  const handleInputFocus = () => {
    if (searchResults.length > 0) {
      setShowDropdown(true);
    }
  };

  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(0, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(totalPages - 1, prev + 1));
  };

  return (
    <div className="relative w-full animate-fadeIn">
      <div className="flex items-stretch gap-0 w-full max-w-sm">
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={handleInputFocus}
          placeholder="例: 7203 / トヨタ / ソニー"
          className="bg-kw-surface border-2 border-kw-white text-kw-on-bg font-body text-lg px-3 py-2 w-full focus:outline-none focus:border-kw-accent focus:ring-0 placeholder:text-kw-outline-variant uppercase h-12"
          style={{ fontFamily: 'monospace' }}
          disabled={isLoading}
        />
      </div>

      {showDropdown && currentResults.length > 0 && createPortal(
        <div
          ref={dropdownRef}
          className="fixed z-[9999] bg-kw-bg border-2 border-kw-white overflow-hidden animate-fadeIn"
          style={{
            left: `${dropdownPosition.left}px`,
            top: `${dropdownPosition.top}px`,
            width: `${dropdownPosition.width}px`,
            maxHeight: '400px',
            boxShadow: '4px 4px 0 0 #d2f000',
            pointerEvents: 'auto'
          }}
        >
          <div className="max-h-80 overflow-y-auto" style={{ overflowY: 'auto' }}>
            {currentResults.map((stock, index) => (
              <button
                key={`${stock.code}-${index}`}
                onClick={() => handleStockClick(stock)}
                className="w-full px-4 py-2.5 text-left hover:bg-kw-surface-high transition-colors border-b border-kw-outline-variant last:border-b-0"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="font-display text-kw-accent font-bold whitespace-nowrap text-sm">{stock.code}</div>
                    <div className="text-sm text-kw-on-surface-variant truncate font-body" title={stock.name}>
                      {stock.name.length > 6 ? `${stock.name.slice(0, 6)}...` : stock.name}
                    </div>
                  </div>
                  <div className="text-xs text-kw-on-surface-variant bg-kw-surface-highest px-2 py-1 font-body font-medium whitespace-nowrap">
                    {stock.market}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-between px-4 py-2 bg-kw-surface-highest border-t border-kw-outline-variant">
              <button onClick={handlePrevPage} disabled={currentPage === 0} className="flex items-center gap-1 px-3 py-1 text-sm font-body text-kw-on-surface-variant bg-kw-surface-container border border-kw-outline-variant hover:bg-kw-surface-high disabled:opacity-50 disabled:cursor-not-allowed transition-colors"><ChevronLeft className="w-3 h-3" />前へ</button>
              <div className="text-sm font-display text-kw-on-bg">{currentPage + 1} / {totalPages}</div>
              <button onClick={handleNextPage} disabled={currentPage === totalPages - 1} className="flex items-center gap-1 px-3 py-1 text-sm font-body text-kw-on-surface-variant bg-kw-surface-container border border-kw-outline-variant hover:bg-kw-surface-high disabled:opacity-50 disabled:cursor-not-allowed transition-colors">次へ<ChevronRight className="w-3 h-3" /></button>
            </div>
          )}
        </div>,
        document.body
      )}

      {isLoading && (
        <div className="absolute left-0 right-0 top-full mt-2 text-center text-xs text-kw-outline font-body">
          読み込み中...
        </div>
      )}
    </div>
  );
}
