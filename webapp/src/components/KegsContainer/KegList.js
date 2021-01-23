import React from 'react'
import KegListItem from './KegListItem'

const KegList = (props) => {

    const kegs = props.kegs.map((keg,index) => {
        return ( 
                <div key={index}>
                  <KegListItem 
                    data={keg} 
                    index={index} 
                    onUpdate={props.onUpdateKeg}
                    onDelete={props.onDeleteKeg} 
                    />
                </div>
              )
      })
    return (
        <div>{kegs}</div>
    )
}
export default KegList