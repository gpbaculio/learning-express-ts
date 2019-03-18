//   /lib/controllers/crmController.ts
import * as mongoose from 'mongoose';
import { ContactSchema } from '../models/crmModel';
import { Request, Response } from 'express';

const Contact = mongoose.model('Contact', ContactSchema);

export class ContactController {
  // add new contact
  public addNewContact(req: Request, res: Response) {
    const newContact = new Contact(req.body);
    console.log('contact body', req.body);
    console.log('newContact', req);
    newContact.save((err, contact) => {
      if (err) {
        res.send(err);
      }
      res.json(contact);
    });
  }
  // get contacts
  public getContacts(req: Request, res: Response) {
    Contact.find({}, (err, contact) => {
      if (err) {
        res.send(err);
      }
      res.json(contact);
    });
  }
  // get specific contact by id
  public getContactWithID({ params }: Request, res: Response) {
    Contact.findById(params.contactId, (err, contact) => {
      if (err) {
        res.send(err);
      }
      res.json(contact);
    });
  }
  // update contact by id
  public updateContact(req: Request, res: Response) {
    Contact.findOneAndUpdate(
      { _id: req.params.contactId },
      req.body,
      { new: true },
      (err, contact) => {
        if (err) {
          res.send(err);
        }
        res.json(contact);
      }
    );
  }
  public deleteContact(req: Request, res: Response) {
    Contact.remove({ _id: req.params.contactId }, (err, contact) => {
      if (err) {
        res.send(err);
      }
      res.json({ message: 'Successfully deleted contact!' });
    });
  }
}
