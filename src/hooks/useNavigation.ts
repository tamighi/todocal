import { useNavigation as RNuseNavigation } from "@react-navigation/native";
import { StackNavigation } from "@/Navs";

export const useNavigation = RNuseNavigation<StackNavigation>;
