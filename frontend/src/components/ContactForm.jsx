import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createContact } from '../features/contacts/contactSlice';

function ContactForm() {
   const [contact, setContact] = useState('');
   const dispatch = useDispatch();

   const onSubmit = (e) => {
      e.preventDefault();

      dispatch(createContact({ contact }));
      setContact('');
   };

   return (
      <section className="form">
         <form onSubmit={onSubmit}>
            <div className="form-group">
               <label htmlFor="contact">Contact</label>
               <input type="text" name="contact" id="contact" value={contact} onChange={(e) => setContact(e.target.value)} />
            </div>
            <div className="form-group">
               <button className="btn btn-block" type="submit">
                  Add Contact
               </button>
            </div>
         </form>
      </section>
   );
}

export default ContactForm;
