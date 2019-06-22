import React from "react";
import _ from "lodash";
import {compose} from 'recompose';
import {centerContent} from '../../app-content/src';

export const ListMenuPure = (props) => {
  const {
    controlComponentId,
    componentid,
    items,
    Header,
    Content,
    itemClassName,
    filter
  } = props;
  return (<ul className="list-group">
    {
      items.map((item, i) => {

        const itemProps = {
          ...props,
          item
        };

        const itemExcluded = !filter || filter.includes(item.id);

        const className = "p-2 list-group-item " + (
          itemClassName
          ? itemClassName(itemProps)
          : "");
        return (<li className={className} key={i}>

          <span className={"vertical-center d-block mb-0 " + (
              !(itemExcluded)
              ? "text-muted"
              : "")}>
            <Header {...itemProps}></Header>

            {
              (itemExcluded) && <div style={{
                    position: "absolute",
                    top: 0,
                    right: 0
                  }}>
                  <button onClick={(e) => {
                      e.preventDefault();
                      centerContent(controlComponentId + "_item_" + item.id)
                    }} type="button" className={"btn btn-link float-right"}>
                    <i className="fa fa-arrow-right"></i>
                  </button>
                </div>
            }

          </span>
          {itemExcluded && Content && <Content {...itemProps}></Content>}
        </li>);
      })

    }
  </ul>)
};

const Comp = compose(
/**/)(ListMenuPure);
export {
  Comp as ListMenu
};
