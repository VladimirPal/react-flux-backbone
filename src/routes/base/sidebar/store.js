import _ from 'lodash'
import Reflux from 'reflux';
import Actions from './actions'

let deepChange = (items, activeId) => {
  items.map((item, key) => {
    if (item.childrens) {
      if (_.findWhere(item.childrens, { 'id': activeId })) {
        item.isActive = true;
        item.isOpen = true;
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
        name: "Main page",
        icon: "fa fa-th-large",
        childrens: [
          {id: "MainPage", name: "SubMenu item", href: "#/"},
          {name: "SubMenu item", href: "#"}
        ]
      },
      { id: "SecondPage", name: "Second menu item", href: "#/second"},
      {
        name: "Third menu item",
        childrens: [
          {id: "ThirdPage", name: "SubMenu item", href: "#/third"},
          {name: "SubMenu item", href: "#"}
        ]
      }
    ];

    return {menuItems: this.menuItems};
  },

  updateList() {
    console.log(this.menuItems);
    this.trigger(this.menuItems);
  }
});
