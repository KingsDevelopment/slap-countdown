/* tslint:disable */

declare var Object: any;
export interface EntryInterface {
  sender: string;
  receiver: string;
  description: string;
  slug: string;
  expireDate: Date;
  id?: any;
  created?: Date;
  modified?: Date;
}

export class Entry implements EntryInterface {
  sender: string;
  receiver: string;
  description: string;
  slug: string;
  expireDate: Date;
  id: any;
  created: Date;
  modified: Date;
  constructor(data?: EntryInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Entry`.
   */
  public static getModelName() {
    return "Entry";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Entry for dynamic purposes.
  **/
  public static factory(data: EntryInterface): Entry{
    return new Entry(data);
  }  
  /**
  * @method getModelDefinition
  * @author Julien Ledun
  * @license MIT
  * This method returns an object that represents some of the model
  * definitions.
  **/
  public static getModelDefinition() {
    return {
      name: 'Entry',
      plural: 'entries',
      properties: {
        sender: {
          name: 'sender',
          type: 'string'
        },
        receiver: {
          name: 'receiver',
          type: 'string'
        },
        description: {
          name: 'description',
          type: 'string'
        },
        slug: {
          name: 'slug',
          type: 'string'
        },
        expireDate: {
          name: 'expireDate',
          type: 'Date'
        },
        id: {
          name: 'id',
          type: 'any'
        },
        created: {
          name: 'created',
          type: 'Date'
        },
        modified: {
          name: 'modified',
          type: 'Date'
        },
      },
      relations: {
      }
    }
  }
}
