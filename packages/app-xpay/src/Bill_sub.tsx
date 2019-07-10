
import React from 'react';
import styled from 'styled-components';
import { withCalls } from '@polkadot/ui-api/with';
import BN from 'bn.js';
import ItemCard from './invoice';
const Wrapper = styled.section`
  display: flex;
  flex-wrap: wrap;
`;
type ItemIDLabelProp = {
  diner_url: number,
  itemIds?:Array<string>
};
const ItemIDLabelComp = ({itemIds }: ItemIDLabelProp) => {
  return (
    <>
      {itemIds}
    </>
  );
};
const itemIds = withCalls<ItemIDLabelProp>(
  ['query.xPay.dinerItems', { paramName: 'diner_url',propName:"itemIds" }]
)(ItemIDLabelComp);
type Props = {    
    diner_url: number,
    
};
type State = {
    asset: number,
    price: BN
};
class Bill_sub extends React.PureComponent<Props, State> {
    state: State = {
        asset: 16000,
        price: new BN(1000000000)
      };
    render () {
        const { asset, price } = this.state;
        const {diner_url} = this.props;
        const items = [];
        const itemIds = <itemIds
        diner_url = {diner_url}
        />
        for (let i = 0; i < itemIds.length; ++i) {
            items.push(
            <ItemCard
                key={i}
                itemId={itemIds[i]}
                payingAsset={asset}
                payingPrice={price}
            />
            );
    }
    return (
      <>
        <Wrapper>
          {items}
        </Wrapper>
      </>
    );
    }
}


export default withCalls<Props>(
  )(Bill_sub);