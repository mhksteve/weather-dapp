import { useState } from 'react';

interface SearchFormProps {
  onSearch: (city: string) => void;
  disabled: boolean;
}

/**
 * Controlled search form.
 * Owns the input value locally; calls `onSearch` only when the form
 * is submitted with a non-empty value.
 */
export function SearchForm({ onSearch, disabled }: SearchFormProps) {
  const [city, setCity] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (city.trim()) onSearch(city);
  }

  return (
    <form className="search-form" onSubmit={handleSubmit} noValidate>
      <input
        type="text"
        placeholder="Enter a city name…"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        disabled={disabled}
        aria-label="City name"
        autoFocus
      />
      <button type="submit" disabled={disabled || !city.trim()}>
        {disabled ? 'Storing…' : 'Get Weather'}
      </button>
    </form>
  );
}
