import React, { useState, useEffect } from "react";
import { Table, Input, Select } from "antd";
// import '';

const { Option } = Select;
const { Search } = Input;

const TablesData = () => {
    const initialRows = [
        { RenderingEngine: "Trident", Browser: "Internet Explorer 4.0", Platform: "Win 95+", EngineVersion: "4", CSSGrade: "X" },
        { RenderingEngine: "Trident", Browser: "Internet Explorer 5.0", Platform: "Win 95+", EngineVersion: "5", CSSGrade: "C" },
        { RenderingEngine: "Abc", Browser: "Internet Explorer 5.5", Platform: "Win 95+", EngineVersion: "5.5", CSSGrade: "A" },
        { RenderingEngine: "Tri", Browser: "Internet Explorer 6", Platform: "Win 98+", EngineVersion: "6", CSSGrade: "A" },
        { RenderingEngine: "Triten", Browser: "Internet Explorer 7", Platform: "Win XP SP2+", EngineVersion: "7", CSSGrade: "A" },
        { RenderingEngine: "Trident", Browser: "AOL browser (AOL desktop)", Platform: "Win XP", EngineVersion: "6", CSSGrade: "A" },
        { RenderingEngine: "Gecko", Browser: "Firefox 1.0", Platform: "Win 98+ / OSX.2+", EngineVersion: "1.7", CSSGrade: "A" },
        { RenderingEngine: "Gecko", Browser: "Firefox 1.5", Platform: "Win 98+ / OSX.2+", EngineVersion: "1.8", CSSGrade: "A" },
        { RenderingEngine: "Gecko", Browser: "Firefox 2.0", Platform: "Win 98+ / OSX.2+", EngineVersion: "1.8", CSSGrade: "A" },
        { RenderingEngine: "Gecko", Browser: "Firefox 3.0", Platform: "Win 2k+ / OSX.3+", EngineVersion: "1.9", CSSGrade: "A" },
        { RenderingEngine: "Trident", Browser: "Internet Explorer 4.0", Platform: "Win 95+", EngineVersion: "4", CSSGrade: "X" },
        { RenderingEngine: "Trident", Browser: "Internet Explorer 5.0", Platform: "Win 95+", EngineVersion: "5", CSSGrade: "C" },
        { RenderingEngine: "Abc", Browser: "Internet Explorer 5.5", Platform: "Win 95+", EngineVersion: "5.5", CSSGrade: "A" },
        { RenderingEngine: "Tri", Browser: "Internet Explorer 6", Platform: "Win 98+", EngineVersion: "6", CSSGrade: "A" },
        { RenderingEngine: "Triten", Browser: "Internet Explorer 7", Platform: "Win XP SP2+", EngineVersion: "7", CSSGrade: "A" },
        { RenderingEngine: "Trident", Browser: "AOL browser (AOL desktop)", Platform: "Win XP", EngineVersion: "6", CSSGrade: "A" },
        { RenderingEngine: "Gecko", Browser: "Firefox 1.0", Platform: "Win 98+ / OSX.2+", EngineVersion: "1.7", CSSGrade: "A" },
        { RenderingEngine: "Gecko", Browser: "Firefox 1.5", Platform: "Win 98+ / OSX.2+", EngineVersion: "1.8", CSSGrade: "A" },
        { RenderingEngine: "Gecko", Browser: "Firefox 2.0", Platform: "Win 98+ / OSX.2+", EngineVersion: "1.8", CSSGrade: "A" },
        { RenderingEngine: "Gecko", Browser: "Firefox 3.0", Platform: "Win 2k+ / OSX.3+", EngineVersion: "1.9", CSSGrade: "A" },
        { RenderingEngine: "Trident", Browser: "Internet Explorer 4.0", Platform: "Win 95+", EngineVersion: "4", CSSGrade: "X" },
        { RenderingEngine: "Trident", Browser: "Internet Explorer 5.0", Platform: "Win 95+", EngineVersion: "5", CSSGrade: "C" },
        { RenderingEngine: "Abc", Browser: "Internet Explorer 5.5", Platform: "Win 95+", EngineVersion: "5.5", CSSGrade: "A" },
        { RenderingEngine: "Tri", Browser: "Internet Explorer 6", Platform: "Win 98+", EngineVersion: "6", CSSGrade: "A" },
        { RenderingEngine: "Triten", Browser: "Internet Explorer 7", Platform: "Win XP SP2+", EngineVersion: "7", CSSGrade: "A" },
        { RenderingEngine: "Trident", Browser: "AOL browser (AOL desktop)", Platform: "Win XP", EngineVersion: "6", CSSGrade: "A" },
        { RenderingEngine: "Gecko", Browser: "Firefox 1.0", Platform: "Win 98+ / OSX.2+", EngineVersion: "1.7", CSSGrade: "A" },
        { RenderingEngine: "Gecko", Browser: "Firefox 1.5", Platform: "Win 98+ / OSX.2+", EngineVersion: "1.8", CSSGrade: "A" },
        { RenderingEngine: "Gecko", Browser: "Firefox 2.0", Platform: "Win 98+ / OSX.2+", EngineVersion: "1.8", CSSGrade: "A" },
        { RenderingEngine: "Gecko", Browser: "Firefox 3.0", Platform: "Win 2k+ / OSX.3+", EngineVersion: "1.9", CSSGrade: "A" },
        { RenderingEngine: "Trident", Browser: "Internet Explorer 4.0", Platform: "Win 95+", EngineVersion: "4", CSSGrade: "X" },
        { RenderingEngine: "Trident", Browser: "Internet Explorer 5.0", Platform: "Win 95+", EngineVersion: "5", CSSGrade: "C" },
        { RenderingEngine: "Abc", Browser: "Internet Explorer 5.5", Platform: "Win 95+", EngineVersion: "5.5", CSSGrade: "A" },
        { RenderingEngine: "Tri", Browser: "Internet Explorer 6", Platform: "Win 98+", EngineVersion: "6", CSSGrade: "A" },
        { RenderingEngine: "Triten", Browser: "Internet Explorer 7", Platform: "Win XP SP2+", EngineVersion: "7", CSSGrade: "A" },
        { RenderingEngine: "Trident", Browser: "AOL browser (AOL desktop)", Platform: "Win XP", EngineVersion: "6", CSSGrade: "A" },
        { RenderingEngine: "Gecko", Browser: "Firefox 1.0", Platform: "Win 98+ / OSX.2+", EngineVersion: "1.7", CSSGrade: "A" },
        { RenderingEngine: "Gecko", Browser: "Firefox 1.5", Platform: "Win 98+ / OSX.2+", EngineVersion: "1.8", CSSGrade: "A" },
        { RenderingEngine: "Gecko", Browser: "Firefox 2.0", Platform: "Win 98+ / OSX.2+", EngineVersion: "1.8", CSSGrade: "A" },
        { RenderingEngine: "Gecko", Browser: "Firefox 3.0", Platform: "Win 2k+ / OSX.3+", EngineVersion: "1.9", CSSGrade: "A" },
    ];
    const [searchTerm, setSearchTerm] = useState('');
    const [pageSize, setPageSize] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [filteredRows, setFilteredRows] = useState(initialRows);

    useEffect(() => {
        const searchResults = initialRows.filter(row =>
            Object.values(row).some(value =>
                value.toString().toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
        setFilteredRows(searchResults);
    }, [searchTerm, initialRows]);

    const columns = [
        {
            title: 'Rendering Engine',
            dataIndex: 'RenderingEngine',
            key: 'RenderingEngine',
        },
        {
            title: 'Browser',
            dataIndex: 'Browser',
            key: 'Browser',
        },
        // Add the rest of your columns here
    ];

    return (
        <div>
            <div style={{ padding: 10 , display: "flex" , justifyContent: "space-between"}} >
                <div style={{ display: "flex" , alignItems: "center" }}>
                    <p>Show</p>
                    <Select defaultValue={10} style={{ width: 250 , padding:"10px"}} onChange={value => setPageSize(value)}>
                        <Option value={10}>10</Option>
                        <Option value={25}>25</Option>
                        <Option value={50}>50</Option>
                        <Option value={100}>100</Option>
                    </Select>
                    <p>entities</p>
                </div>

                <div style={{ display: "flex" , alignItems: "center" }}>
                    <p>Search</p>
                    <Search
                        placeholder="Search..."
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ width: 200, padding:"10px"}}
                    />
                </div>

            </div>
            <Table
                columns={columns}
                dataSource={filteredRows}
                pagination={{
                    current: currentPage,
                    pageSize: pageSize,
                    onChange: (page, pageSize) => {
                        setCurrentPage(page);
                        setPageSize(pageSize);
                    }
                }}
                rowKey="id" // Ensure each row has a unique 'id' prop; adjust as needed
            />
        </div>
    );
}

export default TablesData;
