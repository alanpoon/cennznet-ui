import React from 'react';
import { withCalls } from '@polkadot/ui-api/with';
import BN from 'bn.js';
import Belanja from './Belanja';

type Props = {
  accountId?: string
};

type State = {
  asset: number,
  price: BN,
};
class Query_param extends React.PureComponent<Props, State> {
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
        const {accountId} = this.props;    
        const diner_url = parseInt(this.getParameterByName('diner'));
        const type= this.getParameterByName('type');
        return(
          <Belanja 
            diner_url = {diner_url}
            accountId ={accountId}
            type = {type}
          />
        )
    }
}
export default withCalls<Props>(
)(Query_param);