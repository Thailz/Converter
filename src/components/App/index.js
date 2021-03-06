// == Import npm
import React from 'react';

// == Import
import Header from '../Header';
import Currencies from '../Currencies';
import Amount from '../Amount';
import Toggler from '../Toggler';
import './styles.scss';

import data from '../../data/currencies';

// == Composant
// eslint-disable-next-line react/prefer-stateless-function
class App extends React.Component {
  // Le state est un objet qui va contenir TOUT ce qui peut
  // changer / évoluer comme data dans mon application
  // Ce state, je vais le faire passer, via les props, à tous
  // les composants qui pourraient avoir beoin d'une ou de plusieurs
  // de ces informations.

  state = {
    opened: true,
    baseAmount: 1,
    currency: 'United States Dollar',
  }

  toggle = () => {
    // Si je veux modifier le state
    // je DOIS utiliser la méthode
    // que me fourni react (setState)
    // const opened = this.state.opened;
    const { opened } = this.state;
    this.setState({
      opened: !opened,
    });
  }

  toggle2 = (name, rate) => {
    this.setState({

      baseAmount: rate,
      currency: name,
    });
  }

  handleChange =(rate) => {
    console.log('Jc le gros PD qui me plante un couteau dans le dos en me mettant dans le meme sac que Selim');
    this.setState({

      // eslint-disable-next-line no-undef
      baseAmount: rate.target.value,
    });
  }

  makeRoundedConversion = () => {
    const { baseAmount, currency } = this.state;
    // Retrouver dans la liste de mes currencies
    // celle dont le name est ce que j'ai dans mon state
    const selectedCurrency = data.find((deviseObject) => deviseObject.name === currency /* true -> j'ai le bon objet */);
    const result = selectedCurrency.rate * baseAmount;
    // ex: result = 3.5752
    const rounded = Math.round(result * 100) / 100;
    // round(3.5752 * 100) -> 357.52 -> 358
    // dividé par 100 -> 3.58
    return rounded;
  }

  render() {
    const { opened, currency } = this.state;
    return (
      <div className="app">
        {/* // Je veux donner à header le baseAmount qui vient du state */}
        <Header baseAmount={this.handleChange} />
        <Toggler opened={opened} onButtonClick={this.toggle} />
        {
          opened && <Currencies currencies={data} onButtonClickAmount={this.toggle2} />
        }

        <Amount amount={this.makeRoundedConversion()} currency={currency} />
      </div>
    );
  }
}

// const App = () => (
//   <div className="app">
//     <Header baseAmount={1} />
//     {
//       opened && <Currencies currencies={data} />
//     }

//     <Amount amount={1.09} currency="United States Dollar" />
//   </div>
// );

// == Export
export default App;
