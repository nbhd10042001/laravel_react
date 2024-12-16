import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from "@heroicons/react/20/solid";

export default function PaginationLinks({ meta, links, onPageClick }) {
  function onClick (ev, url){
    ev.preventDefault();
    if (url === null) { return }
    onPageClick(url);
  }

  const disabledCursor = {
    cursor: 'default'
  }
  
  return (
    <div
      className="flex items-center justify-between border-t border-gray-200 
      bg-white px-4 py-3 sm:px-6 shadow-md mt-4"
    >
      {/* mobile UI */}
      <div className="flex flex-1 justify-between md:hidden">
        <a
          href="#"
          onClick={(ev) => {onClick(ev, links.prev)}}
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
        >
          Previous
        </a>
        <div className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 
          rounded-lg focus:z-20 focus:outline-offset-0">
          <label htmlFor="">{meta.current_page}</label>
        </div>
        <a
          href="#"
          onClick={(ev) => {onClick(ev, links.next)}}
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
        >
          Next
        </a>
      </div>

      {/* large screen */}
      <div className="hidden md:flex md:flex-1 md:flex-col md:items-center md:justify-between">
        {/* rigth part */}
        <div className="mb-4">
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{meta.from}</span> to{" "}
            <span className="font-medium">{meta.to}</span> of{" "}
            <span className="font-medium">{meta.total}</span> results
          </p>
        </div>

        {/* left part */}
        <div>
          <nav
            aria-label="Pagination"
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
          >
            <a
              href="#"
              onClick={(ev) => onClick(ev, (links.prev ? links.first : null))}
              style={!links.prev ? disabledCursor : null}
              className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400  
                ring-1 ring-inset ring-gray-300 hover:bg-gray-200 focus:z-20 focus:outline-offset-0 `
                + (!links.prev && 'bg-gray-200')
              }
            >
              <span className="sr-only">FirstPage</span>
              <ChevronDoubleLeftIcon aria-hidden="true" className="size-5" />
            </a>

            {meta.links.map((link, index) => {
              return (
                <a
                  href="#"
                  key={index}
                  aria-current="page"
                  onClick={(ev) => onClick(ev, (link.active ? null : link.url))}
                  className={
                    (link.active
                      ? `relative z-10 inline-flex items-center px-4 py-2 text-sm font-semibold bg-indigo-600 text-white
                    focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ` 
                      : `relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 
                    hover:bg-gray-200 focus:z-20 focus:outline-offset-0 `
                        // if url null, then change bg-gray button prev/next
                        + (!link.url && 
                            ((index === 0 && 'bg-gray-200') || 
                             (index === meta.links.length - 1 && 'bg-gray-200'))
                          )
                    )
                  }
                  // if url null, then disable cursor button prev/next
                  // or if on page active, then disable cursor current page
                  style={(!link.url || link.active) ? disabledCursor : null}
                  dangerouslySetInnerHTML={{ __html: link.label }}
                >
                </a>
              );
            })}

            <a
              href="#"
              onClick={(ev) => onClick(ev, (links.next ? links.last : null))}
              style={!links.next ? disabledCursor : null}
              className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 
                ring-1 ring-inset ring-gray-300 hover:bg-gray-200 focus:z-20 focus:outline-offset-0 `
                + (!links.next && 'bg-gray-200')
              }
            >
              <span className="sr-only">LastPage</span>
              <ChevronDoubleRightIcon aria-hidden="true" className="size-5" />
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
}
