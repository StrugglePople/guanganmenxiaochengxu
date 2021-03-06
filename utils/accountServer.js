
var cache = require('./cache.js');

var service = {
  setCardsToAccount() {
    var cardMap = {};
    for (let item of getApp().globalData.session.medicalCards) {
      if (cardMap[item.patientId]) {
        cardMap[item.patientId].push(item);
      } else {
        cardMap[item.patientId] = [item];
      }
    }
    for (let item of getApp().globalData.session.patientVoList) {
      item.cards = cardMap[item.id] || [];
    }
    cache.setData('app.session', getApp().globalData.session);
  },
  deleteMember:function(id){
    var accounts = getApp().globalData.session.patientVoList,
      selectMemberId = getApp().cache.getData('selectMemberId');
    for (let i = 0; i < accounts.length; i++) {
      if (id - 0 === accounts[i].id - 0) {
        accounts.splice(i, 1);
        cache.setData('app.session', getApp().globalData.session);
        break;
      }
    }
    if (selectMemberId && selectMemberId == id) {
      getApp().cache.removeKey('selectMemberId');
    }
  },
  deleteCard:function(id){
    var cards = getApp().globalData.session.medicalCards,
      selectCard = getApp().cache.getData('selectCard');
    for (var i = 0; i < cards.length; i++) {
      if (cards[i].id == id) {
        cards.splice(i, 1);
        break;
      }
    }
    if (selectCard && selectCard.id == id) {
      getApp().cache.removeKey('selectCard');
    }
  },
  getSelectMember(){
    var id = cache.getData("selectMemberId");
    for(var member of getApp().globalData.session.patientVoList){
      if (member.id == id){
        return member;
      }
    }
  },
  getMemberById(id) {
    for (var member of getApp().globalData.session.patientVoList) {
      if (member.id == id) {
        return member;
      }
    }
  }
}
module.exports = service;