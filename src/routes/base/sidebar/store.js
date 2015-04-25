import _ from 'lodash';
import Reflux from 'reflux';
import Actions from './actions';

let deepChange = (items, activeId) => {
  items.map((item, key) => {
    if (item.childrens) {
      if (_.findWhere(item.childrens, { 'id': activeId })) {
        item.isActive = true;
        item.isOpen = true;
      } else {
        item.isActive = false;
        item.isOpen = false;
      }
      deepChange(item.childrens, activeId);
    } else {
      item.isActive = activeId === item.id;
    }
  });
};

export default Reflux.createStore({
  listenables: Actions,

  onSetActive(activeId) {
    deepChange(this.menuItems, activeId);
    this.updateList();
  },

  onSwitchOpen(item) {
    item.isOpen = !item.isOpen;
    this.updateList();
  },

  getInitialState() {
    this.menuItems = [
      {
        name: "Example menu list",
        icon: "fa fa-th-large",
        childrens: [
          {id: "contacts", name: "Contacts", href: "#/"},
          {id: "contacts-error", name: "Contacts with error", href: "#/contacts-with-error"},
          {id: "contacts-empty", name: "Contacts empty list", href: "#/contacts-empty-list"}
        ]
      },
      {
        id: "SecondPage",
        icon: "fa fa-th-large",
        name: "Second menu item",
        href: "#/second"
      },
      {
        name: "Third menu item",
        icon: "fa fa-th-large",
        childrens: [
          {id: "ThirdPage", name: "SubMenu item", href: "#/third"},
          {name: "SubMenu item", href: "#/third"}
        ]
      }
    ];

    return {menuItems: this.menuItems};
  },

  updateList() {
    this.trigger(this.menuItems);
  }
});
