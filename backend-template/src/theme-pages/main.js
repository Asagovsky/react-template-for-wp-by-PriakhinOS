import React from 'react'
import ReactDOM from 'react-dom'
import merge from "lodash/merge";
import '../main.sass'
import {data} from "../mock/main.mock";
import {HomePage} from "../pages/Home.page";

const params = {
  slug: 'main', // slug of the page to render
  idToRender: '#main-page', // id of the element to render
  usesOptions: true, // if the page uses options
  usesMockFallback: false, // if the page uses mock data
  usesCleanMock: false, // if the page uses clean mock data
  consoleDebug: false, // if the page uses console debug
  Page: HomePage, // page component to render
  useApi: true // if the page uses api or enqueued data
}

const getData = async () => {
  let wpData = {}

  if(params.useApi) {
    const dataRequest = await fetch(window.location.origin + `/wp-json/wp/v2/pages?slug=${params.slug}&acf_format=standard`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    const page = await dataRequest.json()
    let options = null

    if (params.usesOptions) {
      const optionsRequest = await fetch(window.location.origin + `/wp-json/options/all`)
      options = await optionsRequest.json()
    }
    if (!page[0]) return
    wpData = {
      fields: page[0].acf,
      title: page[0].title,
      options: options
    }

    if (params.consoleDebug) console.log(wpData)

    if (params.usesMockFallback) {
      merge(wpData, data)
    }
  } else {
    wpData = wpPageDataObjectScript || {}
  }

  ReactDOM.render(<params.Page data={wpData} />, document.querySelector(params.idToRender))
}
getData()