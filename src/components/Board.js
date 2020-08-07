import React from 'react'
import Title from './Title'
import GridOnIcon from '@material-ui/icons/GridOn';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { DragableTable } from './DragableTable';
export function Board(){
    return(
        <section className="main-board">
            <Title title='Web Design'/>
            <div className="table-sub-heading">
                <GridOnIcon className="table-heading-text"/>
                <p className="table-heading-text">Main Table</p>
                <ExpandMoreIcon className="table-heading-text"/>
            </div>
            <div className="underline" />
            <DragableTable/>
        </section>
    )
}
