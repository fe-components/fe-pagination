import React from 'react'
import {
  storiesOf
  // action
} from '@kadira/storybook'
import Pagination from '../src/'
/*
import Button from 'fe-button'

const theme = {

}*/

// console.log(Button)

storiesOf('pagination', module)
  .add('with text', () => (
    <div>
      <Pagination onChange={(e) => { console.log(e) }} showPageSizeInfo pageSize={20} totalPage={10} currentPage={1} totalCount={197} />
    </div>
  ))
