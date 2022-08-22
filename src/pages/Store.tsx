import { StoreItem } from 'components/StoreItem';
import React, { MouseEventHandler, useCallback, useEffect, useMemo, useState } from 'react';
// import data from '../utilities/getProducts'
import '../App.css';
import './Store.css';

function Store() {
  const productsURL = 'http://localhost:3001/api/products/';
  const categoriesURL = 'http://localhost:3001/api/product/categories/';

  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);


  type Products = typeof products;
  type SortKeys = keyof any;
  type SortOrder = 'ascn' | 'desc';

  useEffect(() => {
    fetch(productsURL)
      .then((response) => {
        // if (!response.ok) {
        //   throw new Error(
        //     `This is an HTTP error: The status is ${response.status}`
        //   );
        // }
        return response.json();
      })
      .then((actualProducts) => {
        setProducts(actualProducts);
        // setError(null);
      });
    // .catch((err) => {
    //   setError(err.message);
    //   setData(null);
    // });
  }, []);

  useEffect(() => {
    fetch(categoriesURL)
      .then((response) => {
        // if (!response.ok) {
        //   throw new Error(
        //     `This is an HTTP error: The status is ${response.status}`
        //   );
        // }
        return response.json();
      })
      .then((actualCategories) => {
        setCategories(actualCategories);
        // setError(null);
      });
    // .catch((err) => {
    //   setError(err.message);
    //   setData(null);
    // });
  }, []);

  // const [productList, setProductList] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<any[]>();

  function getFilteredList() {
    if (!selectedCategory) {
      return products;
    }
    return products.filter((item) => item.category === selectedCategory)
  }

  const filteredList = useMemo(getFilteredList, [selectedCategory, products]);

  function handleCategoryChange(event: any) {
    setSelectedCategory(event.target.value);
  }

  function sortData({ products, sortKey, reverse }: { products: Products; sortKey: SortKeys; reverse: boolean }) {
    if (!sortKey) return products;

    const sortedData = products.sort((a, b) => {
      return a[sortKey] > b[sortKey] ? 1 : -1;
    });

    if (reverse) {
      return sortedData.reverse();
    }

    return sortedData;
  }

  function SortButton({
    sortOrder,
    columnKey,
    sortKey,
    onClick,
  }: {
    sortOrder: SortOrder;
    columnKey: SortKeys;
    sortKey: SortKeys;
    onClick: MouseEventHandler<HTMLButtonElement>;
  }) {
    return (
      <button
        onClick={onClick}
        className={`${sortKey === columnKey && sortOrder === 'desc' ? 'sort-button sort-reverse' : 'sort-button'}`}
      >
        ▲
      </button>
    );
  }

  const [sortKey, setSortKey] = useState<SortKeys>('last_name');
  const [sortOrder, setSortOrder] = useState<SortOrder>('ascn');

  const sortedData = useCallback(
    () => sortData({ products: products, sortKey, reverse: sortOrder === 'desc' }),
    [products, sortKey, sortOrder],
  );

  function changeSort(key: SortKeys) {
    setSortOrder(sortOrder === 'ascn' ? 'desc' : 'ascn');

    setSortKey(key);
  }

  return (
    <div className="content">
      <div>
        <select name="category-list" id="category-list" onChange={handleCategoryChange}>
          <option value="">{'All'}</option>
          {categories.map((item: any) => (
            <option value="">{item.name}</option>
          ))}
        </select>
      </div>
      <table id="main-store__table">
        <thead className="main-store__table-headers">
          <tr>
            <th>Category</th>
            <th>Name</th>
            <th>
              Price
              <SortButton
                columnKey={'price'}
                onClick={() => changeSort('price')}
                {...{
                  sortOrder,
                  sortKey,
                }}
              />
            </th>
            <th>Add to cart</th>
          </tr>
        </thead>
        {filteredList.map((item) => (
          <StoreItem {...item} category={categories} />
        ))}
        {sortedData().map((item: any) => (
          <StoreItem {...item} />
        ))}
      </table>
    </div>
  );
}

export default Store;
