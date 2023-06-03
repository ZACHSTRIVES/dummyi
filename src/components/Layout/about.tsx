import { Nav } from "@douyinfe/semi-ui";
import Link from "next/link";
import { useRouter } from "next/router";

export function AboutLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();

    const routerMap = {
        number: "/about/number",
        string: "/about/string",
        date: "/about/date"
    };

    return (
        <div>
            <Nav
                renderWrapper={({ itemElement, props }) => {
                    return (
                        <Link
                            style={{ textDecoration: "none" }} 
                            href={routerMap[props.itemKey]}>
                            {itemElement}
                        </Link>
                    );
                }}
                items={[
                    { itemKey: "number", text: "Number" },
                    { itemKey: "string", text: "String" },
                    { itemKey: "date", text: "Date" },
                ]}
            ></Nav>
            {children}
        </div>
    );
}