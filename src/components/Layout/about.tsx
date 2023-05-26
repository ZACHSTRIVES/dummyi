import { Nav } from "@douyinfe/semi-ui";
import Link from "next/link";

export function AboutLayout({ children}: {children: React.ReactNode}) {
    return (
        <div>
            <Nav
                renderWrapper={({ itemElement, isSubNav, isInSubNav, props }) => {
                    const routerMap = {
                        Number: "/about/number",
                        String: "/about/string",
                        Date: "/about/date"
                    };
                    return (
                        <Link 
                            style={{ textDecoration: "none" }}
                            href={routerMap[props.itemKey]}>{itemElement}</Link>
                    );
                }}
                items={[
                    { itemKey: "Number", text: "Number" },
                    { itemKey: "String", text: "String" },
                    { itemKey: "Date", text: "Date" },
                ]}
            ></Nav>
            {children}
        </div>
        
    );
}