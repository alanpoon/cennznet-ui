import React from 'react';
import styled from 'styled-components';
import BN from 'bn.js';
import { Option, AccountId, Tuple, UInt } from '@polkadot/types';
import { AddressMini } from '@polkadot/ui-app';
import { withCalls } from '@polkadot/ui-api/with';
import { formatBalance } from '@polkadot/util';
import { assetRegistry } from '@cennznet/crml-generic-asset';

const Wrapper = styled.div`
  border: 2px solid #eee;
  border-radius: 8px;
  margin: 10px;
  width: 280px;
  overflow: hidden;
`;

const ItemImageWrapper = styled.div`
  height: 180px;
  line-height: 100px;
  text-align: center;

  img {
    height: 100%;
    width: 100%;
  }
`;

const ItemDescWrapper = styled.div`
  padding: 10px;
`;

type Props = {
  itemId: number,
  item?: Option<UInt>,
  owner?: Option<AccountId>,
  quantity?: UInt,
  price?: Option<Tuple>
};

const ItemCard = ({  itemId, item, owner, quantity, price }: Props) => {
  const [asset, amount] = price ? price.unwrap() : [16000, 0];
  const assetObj = assetRegistry.findAssetById(+asset) || {} as any;
  const assetName = assetObj.symbol || `Asset ${asset}`;
  const quantityValue = quantity ? quantity.toNumber() : 0;
  return (
    <Wrapper>
      <ItemDescWrapper>
        <label>ID: {itemId}</label>
        <label>
          Merchant:
          <AddressMini
            value={owner && owner.unwrap()}
          />
        </label>
        <label>Stock: {quantityValue}</label>
        <label>Price: {assetName} ${formatBalance((amount).toString())}</label>
      </ItemDescWrapper>
    </Wrapper>
  );
};

export default withCalls<Props>(
  ['query.xPay.items', { paramName: 'itemId', propName: 'item' }],
  ['query.xPay.itemOwners', { paramName: 'itemId', propName: 'owner' }],
  ['query.xPay.itemQuantities', { paramName: 'itemId', propName: 'quantity' }],
  ['query.xPay.itemPrices', { paramName: 'itemId', propName: 'price' }]
)(ItemCard);
