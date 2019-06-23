import React from "react";
import _ from "lodash";
import {compose, withStateHandlers, lifecycle, withProps} from 'recompose';
import {LoadingIcon, ConfigMenu} from '../../app-ui/src';
import {QueryContext} from '../../app-query/src';
import {Item} from './Item';
import {ListMenu} from './Menu' // check withStateHandlers
import {ListFilter} from './Filter' // check withStateHandlers
import {MainWindowControl} from './ItemWindow'
import {ContentActionConnector} from '../../app-content/src';
import {InlineSearch, InlineSearchExternalConnector} from '../../app-search/src';
import {ListConnector} from './state/connector'

export const ListPureComp = (props) => {

  return (<QueryContext.Consumer>
    {
      queries => {

        // ItemHeader
        const {
          componentid,
          attributes,
          items: unsortItems,
          size = "regular",
          search,
          item,
          menu,
          filter,
          filters = [],
          sort = items => items,
          listState,
          changeFilter,
          type = "card"
        } = props;

        if (!componentid) {
          return <b className="text-danger">INVALID</b>
        }

        const {setComponentSection, setComponentWindowMode} = props;
        const items = sort(unsortItems);

        const ItemMenuHeader = menu
          ? menu.header
          : null;
        const ItemMenuContent = menu
          ? menu.content
          : null;

        const ItemHeader = item.header;
        const ItemSections = item.sections;
        const ItemFooter = item.footer;
        const ItemMode = item.mode;
        const ItemOnLoadingQueries = item.onLoadingQueries;

        // ContentActionConnector
        let searchKeyword = null;
        //console.log(search);
        if (search) {
          searchKeyword = search.value;
        }

        const filterBase = filter || _.map(items, m => m.id);

        let filtersOn = (searchKeyword && searchKeyword !== "");
        const includeSet = new Set();
        if (searchKeyword && searchKeyword !== "") {
          for (const itm of items) {
            const modInf = JSON.stringify(itm);
            if (modInf.includes(searchKeyword)) {
              includeSet.add(itm.id)
            }
          }
        }

        for (const ftr of filters) {
          if (listState.filters[ftr.filterid].active) {
            filtersOn = true;
            for (const itm of items) {
              const filtered = ftr.filter({item: itm});
              if (filtered) {
                includeSet.add(itm.id)
              }/* else {
                includeSet.delete(itm.id);
              }*/
            }
          }
        }

        const searched = filtersOn
          ? _.filter(filterBase, i => includeSet.has(i))
          : filterBase;

        let itemsList = null;
        const itemsListFilter = _.filter(items, o => searched.includes(o.id));

        const propsList = {
          ...props,
          items: itemsListFilter,
          filter: searched
        };

        const propsListMenu = {
          ...props,
          items,
          filter: searched
        };

        if (itemsListFilter.length > 0) {

          itemsList = itemsListFilter.map((item, i) => {

            const itemProps = {
              ...propsList,
              componentid: componentid + "_item_" + item.id,
              key: i,
              attributes,
              size,
              item,
              header: ItemHeader,
              footer: ItemFooter,
              sections: ItemSections,
              onLoadingQueries: ItemOnLoadingQueries,
              queries,
              mode: ItemMode,
              type
            };

            return (<Item {...itemProps}></Item>);
          })
        } else {

          itemsList = <div className="col-12 text-center">
            <span className="d-block pt-5">
              <h2>
                <i className="text-warning fa fa-exclamation-triangle"></i>{' '}No items to show</h2>
            </span>
          </div>
        }

        const sectionsMenu = _.reduce(ItemSections, (res, e, k) => {
          const Label = e.label;

          if (!Label) {
            return res;
          }

          let showSec = false;
          if (e.hide) {
            for (const item of items) {
              if (!e.hide({item, attributes})) {
                showSec = true;
              }
            }
          } else {
            showSec = true;
          }

          if (showSec) {
            res.push(<button onClick={(evt) => {
                evt.preventDefault();

                for (const itm of items) {
                  setComponentSection({
                    componentid: componentid + "_item_" + itm.id,
                    section: e.sectionid
                  });
                }

              }} key={k} type="button" className="btn btn-link">
              <Label isTitle={true}></Label>
            </button>);
          }

          return res;
        }, []);

        const mdSize = ItemMenuContent
          ? "col-md-9 col-lg-10"
          : "";

        const sectionSelectors = <div>
          <small className="text-muted">Sections{' '}<i className="fa fa-angle-double-right"></i>
          </small>{' '}<div className="btn-group" role="group" aria-label="Section selector">
            {sectionsMenu}
          </div>
        </div>;

        return (<React.Fragment>
          <div id={componentid + "_list_control"} className="row mt-4 pb-4">
            <div className="col-6">

              {(ItemSections.length > 1) && sectionSelectors}

              <ListFilter componentid={componentid + "_filters"} changeFilter={changeFilter} listState={listState} items={items} filters={filters}></ListFilter>

            </div>
            <div className="col-6">

              <InlineSearch componentid={componentid + "_search"} className="float-right"></InlineSearch>
              <ConfigMenu id={"MainList"} className="float-right">
                <MainWindowControl controlComponentId={componentid} componentid={componentid + "_control_window"} items={items} setComponentWindowMode={setComponentWindowMode}></MainWindowControl>
              </ConfigMenu>

            </div>
          </div>

          <div id={componentid + "_list_content"} className="row pb-4">
            {
              ItemMenuContent && (<div className="col-12 col-md-3 col-lg-2">
                <ListMenu controlComponentId={componentid} componentid={componentid + "_menu"} {...propsListMenu} Header={ItemMenuHeader} Content={ItemMenuContent}></ListMenu>
              </div>)
            }
            <div className={"col-12 " + mdSize}>

              {
                type === "card" && (<div className="row">
                  {itemsList}
                </div>)
              }

              {
                type === "ul" && (<ul className="list-group list-group-flush">
                  {itemsList}
                </ul>)
              }

            </div>
          </div>
        </React.Fragment>);

      }
    }
  </QueryContext.Consumer>);
};

const Comp = compose(
/**/
withProps(({filters}) => ({
  initialFilters: {
    filters: _.reduce(filters, (res, val) => {
      res[val.filterid] = {
        active: val.active
      };

      return res;
    }, {})
  }
})),
/**/
ContentActionConnector,
/**/
InlineSearchExternalConnector(),
/**/
ListConnector,
/**
lifecycle({

  componentDidMount: function() {

    //if (this.props.filters) {
    //  this.props.initList(this.props.filters)
    //}

  },
  //
  componentDidUpdate: function() {
    //console.log("LIST UPDATED!!!!!!!")
  }
})
/**/)(ListPureComp);

export {
  Comp as List
};
