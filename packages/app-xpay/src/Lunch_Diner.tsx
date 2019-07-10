import React from 'react';
import styled from 'styled-components';
import { withCalls } from '@polkadot/ui-api/with';
import execute from './use';
import './public/d3-floorplan/d3.floorplan.css';
import Floorplan from './static/Sample_Floorplan.jpg';
import $ from 'jquery';
type Props = {

}
type State = {

}
class Lunch_Diner extends React.PureComponent<Props, State> {
    componentDidMount() {
        execute(Floorplan,1,6);
    }
    
    render () {
        
        return (
          <section>
            <div id="demo">
            </div>
          </section>)
    }
}
export default withCalls<Props>(
    ['query.xPay.nextItemId', { propName: 'itemsCount' }]
  )(Lunch_Diner);
  