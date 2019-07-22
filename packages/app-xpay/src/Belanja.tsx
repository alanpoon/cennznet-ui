
import React from 'react';
import styled from 'styled-components';
import { withCalls } from '@polkadot/ui-api/with';
import Belanja_pay from './belanja_pay';
import Belanja_invoice from './belanja_invoice';
import BN from 'bn.js';

const Wrapper = styled.div`
  border: 2px solid #eee;
  border-radius: 8px;
  margin: 10px;
  width: 280px;
  overflow: hidden;
`;

type Props = {    
    accountId?: string,
    diner_url: number,
    type: string,
    itemIds?: any,
    payingAsset?: number,
    payingPrice?: BN
};
type State = {
};
class Belanja extends React.PureComponent<Props, State> {
    state: State = {
      };
    render () {
        const {itemIds,accountId,type,payingAsset,payingPrice} = this.props;
        const itemsCountNum = itemIds ? itemIds.toArray() : [[]];
        const items = [];
        for (let i = 0; i < itemsCountNum[0].length; ++i) {
          if(type=="belanja_pay"){
            items.push(
              <Belanja_pay
                key={i}
                itemId={itemsCountNum[0][i][0].toNumber()}
                quantity={itemsCountNum[0][i][1].toNumber()}
                paid={itemsCountNum[0][i][2].toNumber()}
                unpaid={itemsCountNum[0][i][3].toNumber()}
                accountId={accountId}
                payingAsset={payingAsset}
                payingPrice={payingPrice}
              />
            );   
          }else{
            items.push(
              <Belanja_invoice
              key={i}
              itemId={itemsCountNum[0][i][0].toNumber()}
              quantity={itemsCountNum[0][i][1].toNumber()}
              paid={itemsCountNum[0][i][2].toNumber()}
              unpaid={itemsCountNum[0][i][3].toNumber()}
              />
            )
          }
        }
        return (
          <Wrapper>
          {items}
          </Wrapper>
        )
    }
}


export default withCalls<Props>(
  ['query.xPay.dinerItemIds', { paramName: 'diner_url',propName:"itemIds" }]
  )(Belanja);