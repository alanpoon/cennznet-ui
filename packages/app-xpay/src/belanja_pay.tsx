import React from 'react';
import styled from 'styled-components';
import BN from 'bn.js';
import { Option, AccountId, Tuple, UInt } from '@polkadot/types';
import { AddressMini,TxButton} from '@polkadot/ui-app';
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

const ItemDescWrapper = styled.div`
  padding: 10px;
`;

type Props = {
  itemId: number,
  owner?: Option<AccountId>,
  quantity?: UInt,
  paid?: boolean,
  price?: Option<Tuple>,
  accountId?: string,
  payingAsset?: number,
  payingPrice?: BN
};

const Belanja_pay = ({  itemId, owner, quantity, price,paid ,accountId, payingAsset, payingPrice}: Props) => {
  const [asset, amount] = price ? price.unwrap() : [16000, 0];
  const assetObj = assetRegistry.findAssetById(+asset) || {} as any;
  const assetName = assetObj.symbol || `Asset ${asset}`;
  const quantityValue = quantity ? quantity.toNumber() : 0;
  const paidValue = paid ? paid : false;
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
        <label>Quantiy: {quantityValue}</label>
        <label>Price: {assetName} ${formatBalance((amount).toString())}</label>
        <label>Paid: {paidValue}</label>
        <TxButton
          isDisabled={quantityValue === 0}
          accountId={accountId}
          label='Buy'
          params={[1, itemId, payingAsset, payingPrice]}
          tx='xpay.purchaseItem'
        />
      </ItemDescWrapper>
    </Wrapper>
  );
};

export default withCalls<Props>(
  ['query.xPay.itemOwners', { paramName: 'itemId', propName: 'owner' }],
  ['query.xPay.itemPrices', { paramName: 'itemId', propName: 'price' }]
)(Belanja_pay);
