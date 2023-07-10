import { Component } from 'react';

import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import css from './App.module.css';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem('phonebook');
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState(state => ({
        contacts: parsedContacts,
      }));
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('phonebook', JSON.stringify(this.state.contacts));
    }
  }

  onAddContact = newContact => {
    if (this.state.contacts.find(el => el.name === newContact.name)) {
      return alert(`${newContact.name} is already in contacts`);
    }

    this.setState(state => ({ contacts: [...state.contacts, newContact] }));
  };

  onContactDelete = contactId => {
    this.setState(state => ({
      contacts: state.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  handleFilterChange = e => {
    this.setState({ filter: e.target.value });
  };

  render() {
    return (
      <div className={css.contactSection}>
        <h1>Phonebook</h1>
        <ContactForm onAddContact={this.onAddContact} />

        <h2>Contacts</h2>
        <Filter
          onFilterChange={this.handleFilterChange}
          filterValue={this.state.filter}
        />
        <ContactList data={this.state} onContactDelete={this.onContactDelete} />
      </div>
    );
  }
}
