import PropTypes from 'prop-types';

import css from './ContactList.module.css';

export const ContactList = ({ data, onContactDelete }) => {
  
  const createContactsMarkup = obj => {
    return (
      <li key={obj.id} className={css.listItem}>
        <span className={css.itemText}>
          <b>{obj.name}:</b> <i>{obj.number}</i>
        </span>
        <button
          className={css.delBtn}
          type="button"
          onClick={() => onContactDelete(obj.id)}
        >
          Delete
        </button>
      </li>
    );
  };

  if (data.filter) {
    return (
      <ul className={css.contactsList}>
        {data.contacts
          .filter(({ name }) =>
            name.toLowerCase().includes(data.filter.toLowerCase())
          )
          .map(el => {
            return createContactsMarkup(el);
          })}
      </ul>
    );
  }

  return (
    <ul className={css.contactsList}>
      {data.contacts.map(el => {
        return createContactsMarkup(el);
      })}
    </ul>
  );
};

ContactList.propTypes = {
  data: PropTypes.shape({
    contacts: PropTypes.arrayOf(PropTypes.object).isRequired,
    filter: PropTypes.string.isRequired,
  }),
  onContactDelete: PropTypes.func.isRequired,
};
