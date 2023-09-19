/**
 *
 * @param {JSX.Element[]} cells - The loaders to display each corresponds to a table cell.
 * @param {string} className - The class names for the table row.
 * @returns {JSX.Element}
 */

export default function TableRowSkeleton({ cells = [], className = "" }) {
    const tableLoaderCells = cells.map((loader, index) => (
        <td key={index}>{loader}</td>
    ));

    return <tr className={className}>{tableLoaderCells}</tr>;
}
