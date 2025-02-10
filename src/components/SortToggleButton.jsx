import styles from './SortToggleButton.module.css'

const SortToggleButton = ({ sortDirection, toggleSortDirection }) => {
    return (
        <button className={styles.sortButton} onClick={toggleSortDirection}>
            Sorting is Set To: {sortDirection === 'asc' ? 'Oldest First' : 'Newest First'}
        </button>
    );
}

export default SortToggleButton;