import PropTypes from 'prop-types';

import css from "./Filter.module.css"


export const Filter = ({ onFilterChange, filterValue }) => {
  return (
    <div>
      <label>
        Find contacts by name
        <input
          className={css.filterInput}
          type="text"
          onChange={onFilterChange}
          name="filter"
          value={filterValue}
        />
      </label>
    </div>
  );
};

Filter.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
  filterValue: PropTypes.string.isRequired,
}