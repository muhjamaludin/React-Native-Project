import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import {Ionicons, FontAwesome, Entypo} from '@expo/vector-icons'

import Header from './src/component/Header'
import Score from './src/component/Score'
import Card from './src/component/Card'
import Helper from './src/helpers/helpers'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    
    this.renderCards = this.renderCards.bind(this)
    this.resetCards = this.resetCards.bind(this)

    let sources = {
      'fontawesome': FontAwesome,
      'entypo': Entypo,
      'ionicons': Ionicons
    }

    let cards = [
      {
        src: 'fontawesome',
        name: 'heart',
        color: 'red'
      },
      {
        src: 'entypo',
        name: 'feather',
        color: '#7d4b12'
      },
      {
        src: 'entypo',
        name: 'flashlight',
        color: '#f7911f'
      },
      {
        src: 'entypo',
        name: 'flower',
        color: '#37b24d'
      },
      {
        src: 'entypo',
        name: 'moon',
        color: '#ffd43b'
      },
      {
        src: 'entypo',
        name: 'youtube',
        color: '#f70000'
      },
      {
        src: 'entypo',
        name: 'shop',
        color: '#5f5f5f'
      },
      {
        src: 'fontawesome',
        name: 'github',
        color: '#24292e'
      },
      {
        src: 'fontawesome',
        name: 'skype',
        color: '#1686d9'
      },
      {
        src: 'fontawesome',
        name: 'send',
        color: '#1c7cd6'
      },
      {
        src: 'ionicons',
        name: 'ios-magnet',
        color: '#d61c1c'
      },
      {
        src: 'ionicons',
        name: 'logo-facebook',
        color: '#3c5b9b'
      }
    ]

    let clone = JSON.parse(JSON.stringify(cards))

    this.cards = cards.concat(clone)
    this.cards.map((obj) => {
      let id = Math.random().toString(36).substring(7)
      obj.id = id
      obj.src = sources[obj.src]
      obj.isOpen = false
    })

    this.cards = this.cards.shuffle()

    this.state = {
      current_selection: [],
      selected_pairs: [],
      score: 0,
      cards: this.cards
    }
  }

  render () {
    return (
      <View style={styles.constainer} >
        <Header />
        <View style={styles.body}>
          {
            this.renderRows.call(this)
          }
        </View>
        <Score score={this.state.score} />
        <Button 
          onPress={this.resetCards}
          title='Reset'
          color="#008CFA"
        />
      </View>
    )
  }

  renderRows() {
    let contents = this.getRowContens(this.state.cards)
    return contents.map((cards, index) => {
      return (
        <View key={index} style={styles.row} >
          {this.renderCards(cards)}
        </View>
      )
    })
  }

  getRowContens(cards) {
    let contents_r = []
    let contents = []
    let count = 0
    cards.forEach((item) => {
      count += 1
      contents.push(item)
      if (count == 4) {
        contents_r.push(contents)
        count = 0
        contents = []
      }
    })
    return contents_r
  }

  renderCards(cards) {
    return cards.map((card, index) => {
      return (
        <Card
          key = {index}
          src = {card.src}
          name = {card.name}
          color = {card.color}
          isOpen = {card.isOpen}
          clickCard = {this.clickCard.bind(this, card.id)}
        />
      )
    })
  }

  clickCard(id) {
    let selected_pairs = this.state.selected_pairs
    let current_selection = this.state.current_selection
    let score = this.state.score

    let index = this.state.cards.findIndex((card) => {
      return card.id == id
    })

    let cards = this.state.cards
    if (cards[index].isOpen == false && selected_pairs.indexOf(cards[index].name) === -1) {

      cards[index].isOpen = true;
        
        current_selection.push({ 
          index: index,
          name: cards[index].name
        });

        if(current_selection.length == 2){
          if(current_selection[0].name == current_selection[1].name){
            score += 1;
            selected_pairs.push(cards[index].name);
          }else{
           
            cards[current_selection[0].index].isOpen = false;

            setTimeout(() => {
              cards[index].isOpen = false;
              this.setState({
                cards: cards
              });
            }, 500);
          }

          current_selection = [];
      }
      this.setState({
        score: score,
        cards: cards,
        current_selection: current_selection
      })
    }
  }

  resetCards() {

    let cards = this.cards.map((obj) => {
      obj.isOpen = false
      return obj
    })

    cards = cards.shuffle()

    this.setState({
      current_selection: [],
      selected_pairs: [],
      cards: cards,
      score: 0
    })
  }

}



const styles = StyleSheet.create({
  constainer: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#fff'
  },
  row: {
    flex: 1,
    flexDirection: 'row'
  },
  body: {
    flex: 18,
    justifyContent: 'space-between',
    padding: 10,
    marginTop: 20 
  }
})