/**
 * 组件库
 */
import React from 'react';
import { RaisedButton } from 'material-ui';
import { Accordion, AccordionItem } from 'react-sanfona';
import CompSnap from './CompSnap';
import _ from 'lodash';
import { Lookup } from '../../../constants/LookUp';

const grouped = _.groupBy(_.values(Lookup), 'group');

const CompsBox = (props) =>
  <div>
      <Accordion>
        {
          _.keys(grouped).map((category, i) =>
            <AccordionItem title={category} key={i}>
              {
                (grouped[category]).map(({ name, type, img }, index) =>
                  <CompSnap key={index} name={name} type={type} image={img}/>
                )
              }
            </AccordionItem>
          )
        }
      </Accordion>
  </div>;

export default CompsBox;
