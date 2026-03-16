import {
  Button,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  Table,
  styled,
} from "@mui/material";
import { Link, useSearchParams } from "react-router-dom";
import { categories } from "../../constants/data";
//import createPost from "../create/createPost";
const Styledtable = styled(Table)`
  border: 1px solid rgba(224, 224, 224, 1);
`;
const Styledbutton = styled(Button)`
  margin: 20px;
  width: 85%;
  background: #6495ed;
  color: #fff;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const Categories = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  return (
    <>
      <StyledLink to={`/create?category=${category || ""}`}>
        <Styledbutton>create blog</Styledbutton>
      </StyledLink>
      <Styledtable>
        <TableHead>
          <TableRow>
            <TableCell>
              <Link to="/">all categories</Link>
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {categories.map((category) => (
            <TableRow>
              <TableCell>
                <StyledLink to={`/?category=${category.type}`}>
                  {category.type}
                </StyledLink>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Styledtable>
    </>
  );
};
export default Categories;
