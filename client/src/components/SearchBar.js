import React, { useState, useEffect } from "react";
import { SearchIcon } from "@chakra-ui/icons";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { useNavigate, useSearchParams } from "react-router-dom";

export const SearchBar = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const itemSearchParam = searchParams.get("item");
    if (itemSearchParam) {
      setSearch(itemSearchParam);
    }
  }, []);

  return (
    <InputGroup maxWidth={"2xl"}>
      <InputRightElement pointerEvents={"none"}>
        <SearchIcon color={"gray.500"} />
      </InputRightElement>
      <Input
        focusBorderColor={"secondary.300"}
        placeholder={"Search"}
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        onKeyPress={(e) => {
          if (e.key === "Enter" && search !== "") {
            const formattedSearch = search.replaceAll(" ", "+");
            navigate(`/search?item=${formattedSearch}`);
          }
        }}
      />
    </InputGroup>
  );
};
