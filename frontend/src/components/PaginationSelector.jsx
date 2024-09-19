import React from 'react'
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from './ui/pagination';

const PaginationSelector = ({page, pages, onPageChange}) => {
    const pageNumbers = [];
    for(let i=1;i<=pages;i++){
        pageNumbers.push(i);
    }
    const style = 'cursor-pointer border-none rounded-full'
  return (
    <Pagination>
      <PaginationContent>

        {page!== 1 &&  <PaginationItem>
          <PaginationPrevious className={style} href='#' onClick={()=> onPageChange(page-1)}/>
          </PaginationItem>
        }
        
        {pageNumbers.map((number)=>(
          <PaginationItem>
            <PaginationLink className={style} herf='#' onClick={()=> onPageChange(number)} isActive={page===number}>
            {number}
          </PaginationLink>
          </PaginationItem>
        ))}
        {page !== pageNumbers.length && (
          <PaginationItem>
            <PaginationNext className={style} href='#' onClick={()=> onPageChange(page+1)}/>
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  )
}

export default PaginationSelector