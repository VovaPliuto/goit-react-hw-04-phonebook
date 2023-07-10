import PropTypes from 'prop-types';

import css from './ContactList.module.css';

export const ContactList = ({ data, onContactDelete, filter }) => {
  
  const createContactsMarkup = ({
    id, name, number}) => {
    return (
      <li key={id} className={css.listItem}>
        <span className={css.itemText}>
          <b>{name}:</b> <i>{number}</i>
        </span>
        <button
          className={css.delBtn}
          type="button"
          onClick={() => onContactDelete(id)}
        >
          Delete
        </button>
      </li>
    );
  };

  if (filter) {
    return (
      <ul className={css.contactsList}>
        {data
          .filter(({ name }) =>
            name.toLowerCase().includes(filter.toLowerCase())
          )
          .map(el => {
            return createContactsMarkup(el);
          })}
      </ul>
    );
  }

  return (
    <ul className={css.contactsList}>
      {data.map(el => {
        return createContactsMarkup(el);
      })}
    </ul>
  );
};

ContactList.propTypes = {
  data: PropTypes.array.isRequired,
  filter: PropTypes.string.isRequired,
  onContactDelete: PropTypes.func.isRequired,
};
