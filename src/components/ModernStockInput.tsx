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
      <div className="flex flex-col gap-1 relative">
        <label className="font-body text-[11px] uppercase tracking-wider pl-1 absolute -top-3 left-2 bg-white px-1 brutal-border text-cx-on-bg z-10" style={{ fontWeight: 800 }}>TICKER_CODE / 銘柄</label>
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={handleInputFocus}
          placeholder="例: 7203 / トヨタ / ソニー"
          className="w-full bg-cx-surface-bright brutal-border p-3 font-body text-base text-center focus:outline-none focus:border-cx-pink focus:bg-cx-lime focus:text-cx-navy transition-colors pt-4"
          disabled={isLoading}
        />
      </div>

      {showDropdown && currentResults.length > 0 && createPortal(
        <div
          ref={dropdownRef}
          className="fixed z-[9999] bg-white brutal-border overflow-hidden animate-fadeIn"
          style={{
            left: `${dropdownPosition.left}px`,
            top: `${dropdownPosition.top}px`,
            width: `${dropdownPosition.width}px`,
            maxHeight: '400px',
            boxShadow: '4px 4px 0px 0px #001c3a',
            pointerEvents: 'auto'
          }}
        >
          <div className="max-h-80 overflow-y-auto" style={{ overflowY: 'auto' }}>
            {currentResults.map((stock, index) => (
              <button
                key={`${stock.code}-${index}`}
                onClick={() => handleStockClick(stock)}
                className="w-full px-4 py-2.5 text-left hover:bg-cx-surface-high transition-colors border-b border-cx-outline-variant last:border-b-0"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="font-display text-cx-pink font-bold whitespace-nowrap text-sm">{stock.code}</div>
                    <div className="text-sm text-cx-on-surface-variant truncate font-body" title={stock.name}>
                      {stock.name.length > 6 ? `${stock.name.slice(0, 6)}...` : stock.name}
                    </div>
                  </div>
                  <div className="text-xs text-cx-on-bg bg-cx-lime px-2 py-1 font-body font-bold whitespace-nowrap brutal-border" style={{ borderWidth: '2px' }}>
                    {stock.market}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-between px-4 py-2 bg-cx-surface-highest border-t border-cx-outline-variant">
              <button onClick={handlePrevPage} disabled={currentPage === 0} className="flex items-center gap-1 px-3 py-1 text-sm font-body text-cx-on-bg bg-cx-surface-container brutal-border hover:bg-cx-surface-high disabled:opacity-50 disabled:cursor-not-allowed transition-colors" style={{ borderWidth: '2px' }}><ChevronLeft className="w-3 h-3" />前へ</button>
              <div className="text-sm font-display text-cx-on-bg" style={{ fontWeight: 700 }}>{currentPage + 1} / {totalPages}</div>
              <button onClick={handleNextPage} disabled={currentPage === totalPages - 1} className="flex items-center gap-1 px-3 py-1 text-sm font-body text-cx-on-bg bg-cx-surface-container brutal-border hover:bg-cx-surface-high disabled:opacity-50 disabled:cursor-not-allowed transition-colors" style={{ borderWidth: '2px' }}>次へ<ChevronRight className="w-3 h-3" /></button>
            </div>
          )}
        </div>,
        document.body
      )}

      {isLoading && (
        <div className="absolute left-0 right-0 top-full mt-2 text-center text-xs text-cx-outline font-body">
          読み込み中...
        </div>
      )}
    </div>
  );
}
