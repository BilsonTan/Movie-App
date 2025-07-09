import { StyleSheet, View } from "react-native"
import { SearchBar } from "./search-bar";
import Dropdown from "./dropdown";
import { useMovieContext } from "../../context/movie-context";
import { categories, sortOptions } from "../../utils";

interface IFilterProps {
    onPress: () => void;
}
export const Filters = ({onPress}: IFilterProps) => {
    const { category, setCategory, sortBy, setSortBy } = useMovieContext();
    return (
        <View style={styles.container}>
                <Dropdown
                    label="Category"
                    options={categories}
                    selectedValue={category}
                    onValueChange={value => setCategory(value as any)}
                  />
                  <Dropdown
                    label="Sort by"
                    options={sortOptions}
                    selectedValue={sortBy}
                    onValueChange={value => setSortBy(value as any)}
                    fixedLabel
                  />
                  <SearchBar 
                    onPress={onPress}
                  />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginHorizontal: 16,
    marginBottom: 8,
    padding: 16,
  },
});