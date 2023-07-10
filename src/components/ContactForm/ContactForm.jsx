import { Component } from 'react';
import { nanoid } from 'nanoid';
import PropTypes from "prop-types";

import css from './ContactForm.module.css';

export class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();

    const newName = {
      id: nanoid(6),
      name: this.state.name,
      number: this.state.number,
    };

    this.props.onAddContact(newName);
    this.setState({ name: '', number: '' });
  };

  render() {
    return (
      <>
        <form className={css.contactForm} onSubmit={this.handleSubmit}>
          <label>
            Name
            <input
              onChange={this.handleChange}
              value={this.state.name}
              autoComplete="off"
              type="text"
              name="name"
              pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
            />
          </label>
          <label>
            Phone
            <input
              onChange={this.handleChange}
              value={this.state.number}
              type="tel"
              name="number"
              pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
            />
          </label>
          <button type="submit">Add contact</button>
        </form>
      </>
    );
  }
}

ContactForm.propTypes = {
  onAddContact: PropTypes.func.isRequired,

}
