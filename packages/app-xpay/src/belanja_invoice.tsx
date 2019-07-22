import React from 'react';
import styled from 'styled-components';
import { Option, AccountId, Tuple, UInt } from '@polkadot/types';
import { AddressMini } from '@polkadot/ui-app';
import { withCalls } from '@polkadot/ui-api/with';
import { formatBalance } from '@polkadot/util';
import { assetRegistry } from '@cennznet/crml-generic-asset';
import { itemsById } from './items';
const Wrapper = styled.div`
  border: 2px solid #eee;
  border-radius: 8px;
  margin: 10px;
  width: 280px;
  overflow: hidden;
`;

const ItemDescWrapper = styled.div`
  padding: 10px;
`;

type Props = {
  itemId: number,
  owner?: Option<AccountId>,
  quantity: UInt,
  price?: Option<Tuple>,
  paid?: UInt,
  unpaid?: UInt,
  item?: Option<UInt>
};

const Belanja_invoice = ({  itemId, item, owner, quantity, price,paid,unpaid }: Props) => {
  const [asset, amount] = price ? price.unwrap() : [16000, 0];
  if (itemId === undefined || !item || item.isNone) {
    return (
      <Wrapper>
        <div>Loading...</div>
      </Wrapper>
    );
  }
  const itemValue = item.unwrap();
  const itemObj = itemsById[itemValue.toNumber()] || {};
  const assetObj = assetRegistry.findAssetById(+asset) || {} as any;
  const assetName = assetObj.symbol || `Asset ${asset}`;
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
        <label>{itemObj.name}</label>
        <label>Qty: {quantity}</label>
        <label>Price: {assetName} ${formatBalance((amount).toString())}</label>
        <label>Paid: {paid.toNumber()}/{paid.toNumber()+unpaid.toNumber()}</label>
      </ItemDescWrapper>
    </Wrapper>
  );
};

export default withCalls<Props>(
  ['query.xPay.items', { paramName: 'itemId', propName: 'item' }],
  ['query.xPay.itemOwners', { paramName: 'itemId', propName: 'owner' }],
  ['query.xPay.itemPrices', { paramName: 'itemId', propName: 'price' }]
)(Belanja_invoice);
