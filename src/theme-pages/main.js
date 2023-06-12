import React from 'react'
import ReactDOM from 'react-dom'
import '../main.sass'
import {data} from "../mock/main.mock";
import merge from "lodash/merge";
import {MainPage} from "../pages/Main.page";

const params = {
  slug: 'main',
  idToRender: '#main-page',
  usesOptions: true,
  usesMockFallback: false,
  usesCleanMock: false,
  consoleDebug: false,
  Page: MainPage
}

const getData = async () => {
  const dataRequest = await fetch(window.location.origin + `/wp-json/wp/v2/pages?slug=${params.slug}&acf_format=standard`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  })
  const page = await dataRequest.json()
  let options = null

  if(params.usesOptions) {
    const optionsRequest = await fetch(window.location.origin + `/wp-json/options/all`)
    options = await optionsRequest.json()
  }
  if(!page[0]) return
  const wpData = {
    fields: page[0].acf,
    options: options
  }

  if (params.consoleDebug) console.log(wpData)

  if(params.usesMockFallback) {
    merge(wpData, data)
  }

  ReactDOM.render(<params.Page data={wpData} />, document.querySelector(params.idToRender))
}
getData()