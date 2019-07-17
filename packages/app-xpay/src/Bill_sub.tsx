
import React from 'react';
import styled from 'styled-components';
import { withCalls } from '@polkadot/ui-api/with';
import BN from 'bn.js';
import ItemCard from './invoice';

const Wrapper = styled.div`
  border: 2px solid #eee;
  border-radius: 8px;
  margin: 10px;
  width: 280px;
  overflow: hidden;
`;

type Props = {    
    diner_url: number,
    itemIds?: any
};
type State = {
};
class Bill_sub extends React.PureComponent<Props, State> {
    state: State = {
      };
    render () {
        const {itemIds} = this.props;
        const itemsCountNum = itemIds ? itemIds.toArray() : [[]];
        const items = [];
        for (let i = 0; i < itemsCountNum[0].length; ++i) {
            items.push(
              <ItemCard
                key={i}
                itemId={itemsCountNum[0][i].toNumber()}
              />
            );
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
  )(Bill_sub);