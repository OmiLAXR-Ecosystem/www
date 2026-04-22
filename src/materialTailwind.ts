// Handle both CJS and ESM shapes from @material-tailwind/react across Vite/Astro SSR.
import * as importedPkg from "@material-tailwind/react";

const pkg = ((importedPkg as any).default ?? importedPkg) as any;
export const {
    Accordion,
    AccordionHeader,
    AccordionBody,
    Card,
    CardBody,
    CardHeader,
    Navbar,
    IconButton,
    Input,
    List,
    ListItem,
    Menu,
    MenuHandler,
    MenuList,
    Button,
    Collapse,
    Typography,
    MenuItem,
    ThemeProvider
} = pkg;
