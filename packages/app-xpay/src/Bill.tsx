import React from 'react';
import styled from 'styled-components';
import { withCalls } from '@polkadot/ui-api/with';
import BN from 'bn.js';
import ItemCard from './invoice';
import Bill_sub from './Bill_sub';

type Props = {
};

type State = {
  asset: number,
  price: BN,
};
class Bill extends React.PureComponent<Props, State> {
    state: State = {
      asset: 16000,
      price: new BN(1000000000)
    };
    componentDidMount() {
        
    }
    getParameterByName=(name:any, url?:any):string =>  {
      if (!url) url = window.location.href;
      name = name.replace(/[\[\]]/g, '\\$&');
      var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
          results = regex.exec(url);
      if (!results) return '';
      if (!results[2]) return '';
      return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }
    render () {    
        const diner_url = parseInt(this.getParameterByName('diner'));
        return(
          <Bill_sub 
            diner_url = {diner_url}
          />
        )
    }
}
export default withCalls<Props>(
)(Bill);