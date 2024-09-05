import { categories } from '../../api';

import { Row } from "../../components/Row/Row"
import { Banner } from "../../components/Banner/Banner";
import { Nav } from "../../components/Nav/Nav";

import { useLocation } from 'react-router-dom';

export function Home() {

  const location = useLocation();
  const userId = location.state.userId;

  return (
    <div className="App">
      <Nav />
      <Banner userId={userId} />
      {categories.map((category) => {
        return <Row
                  key={category.name}
                  title={category.title}
                  path={category.path + userId}
                  isLarge={category.isLarge}
                />
      })}
    </div>
  )
}