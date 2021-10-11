import { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Searchbar.module.css';

function Searchbar({ onSubmit }) {
    const [query, setQuery] = useState('')

    const onInputChange = (e) => {
        setQuery(e.currentTarget.value.toLowerCase());
    };

    const onFormSubmit = (e) => {
        e.preventDefault();
        if (query.trim() === '') {
            return alert('Please enter something');
        }

        onSubmit(query);
        setQuery('');
    }

    return (
        <form onSubmit={onFormSubmit} className={styles.search_form}>
            <input
                type="text"
                autoComplete="off"
                autoFocus
                placeholder="Search movies"
                value={query}
                onChange={onInputChange}
                name="query"
            />
            <button type="submit">
                    Search
            </button>
        </form>
    )
 
}

Searchbar.propTypes = {
    onSubmit: PropTypes.func,
  };

export { Searchbar };