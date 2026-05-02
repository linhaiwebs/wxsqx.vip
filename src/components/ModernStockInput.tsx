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
      <div className="flex flex-col gap-1 input-scan relative group">
        <label className="font-display text-xs text-mb-cyan uppercase" style={{ fontWeight: 700, letterSpacing: '0.1em' }}>コード入力 // CODE_INPUT</label>
        <div className="relative flex items-center">
          <svg className="absolute left-2 w-5 h-5 text-mb-on-surface-variant opacity-50" viewBox="0 0 24 24" fill="currentColor"><path d="M12.65 10C11.83 7.67 9.61 6 7 6c-3.31 0-6 2.69-6 6s2.69 6 6 6c2.61 0 4.83-1.67 5.65-4H17v4h4v-4h2v-4H12.65zM7 14c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/></svg>
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={handleInputFocus}
            placeholder="0x0000..."
            className="w-full bg-mb-surface-container border-0 border-b-2 border-mb-outline-variant text-mb-on-bg font-mono p-2 pl-10 focus:ring-0 focus:border-mb-cyan transition-colors focus:bg-mb-surface-highest placeholder:text-mb-outline-variant"
            disabled={isLoading}
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
            <div className="w-2 h-4 bg-mb-outline-variant group-focus-within:bg-mb-cyan animate-pulse"></div>
          </div>
        </div>
      </div>

      {showDropdown && currentResults.length > 0 && createPortal(
        <div
          ref={dropdownRef}
          className="fixed z-[9999] bg-mb-bg border border-mb-outline-variant overflow-hidden animate-fadeIn"
          style={{
            left: `${dropdownPosition.left}px`,
            top: `${dropdownPosition.top}px`,
            width: `${dropdownPosition.width}px`,
            maxHeight: '400px',
            boxShadow: '0 0 0 2px #00fbfb, -4px 4px 0 0 #00fbfb',
            pointerEvents: 'auto'
          }}
        >
          <div className="max-h-80 overflow-y-auto" style={{ overflowY: 'auto' }}>
            {currentResults.map((stock, index) => (
              <button
                key={`${stock.code}-${index}`}
                onClick={() => handleStockClick(stock)}
                className="w-full px-4 py-2.5 text-left hover:bg-mb-surface-high transition-colors border-b border-mb-outline-variant last:border-b-0"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="font-display text-mb-cyan font-bold whitespace-nowrap text-sm" style={{ fontWeight: 700 }}>{stock.code}</div>
                    <div className="text-sm text-mb-on-surface-variant truncate font-body">{stock.name.length > 6 ? `${stock.name.slice(0, 6)}...` : stock.name}</div>
                  </div>
                  <div className="text-[10px] text-mb-on-bg bg-mb-surface-highest px-2 py-1 font-mono whitespace-nowrap border border-mb-outline-variant">
                    {stock.market}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-between px-4 py-2 bg-mb-surface-highest border-t border-mb-outline-variant">
              <button onClick={handlePrevPage} disabled={currentPage === 0} className="flex items-center gap-1 px-3 py-1 text-sm font-mono text-mb-on-bg bg-mb-surface-container border border-mb-outline-variant hover:bg-mb-surface-high disabled:opacity-50 disabled:cursor-not-allowed transition-colors"><ChevronLeft className="w-3 h-3" />前へ</button>
              <div className="text-sm font-mono text-mb-on-surface-variant">{currentPage + 1} / {totalPages}</div>
              <button onClick={handleNextPage} disabled={currentPage === totalPages - 1} className="flex items-center gap-1 px-3 py-1 text-sm font-mono text-mb-on-bg bg-mb-surface-container border border-mb-outline-variant hover:bg-mb-surface-high disabled:opacity-50 disabled:cursor-not-allowed transition-colors">次へ<ChevronRight className="w-3 h-3" /></button>
            </div>
          )}
        </div>,
        document.body
      )}

      {isLoading && (
        <div className="absolute left-0 right-0 top-full mt-2 text-center text-[10px] text-mb-outline font-mono">
          LOADING...
        </div>
      )}
    </div>
  );
}
