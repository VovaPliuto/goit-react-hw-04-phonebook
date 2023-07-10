import { useEffect, useState } from 'react';

import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import css from './App.module.css';

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    const parsedContacts = JSON.parse(localStorage.getItem('phonebook'));
    return parsedContacts ?? [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('phonebook', JSON.stringify(contacts));
  }, [contacts]);

  const onAddContact = newContact => {
    if (contacts.find(el => el.name === newContact.name)) {
      return alert(`${newContact.name} is already in contacts`);
    }

    setContacts(prevState => [...prevState, newContact]);
    console.log(contacts);
  };

  const onContactDelete = contactId => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contactId)
    );
  };

  const handleFilterChange = e => {
    setFilter(e.target.value);
  };

  return (
    <div className={css.contactSection}>
      <h1>Phonebook</h1>
      <ContactForm onAddContact={onAddContact} />

      <h2>Contacts</h2>
      <Filter onFilterChange={handleFilterChange} filterValue={filter} />
      <ContactList
        data={contacts}
        onContactDelete={onContactDelete}
        filter={filter}
      />
    </div>
  );
};
