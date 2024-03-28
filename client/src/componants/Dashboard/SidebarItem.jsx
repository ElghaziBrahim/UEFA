

const SidebarItem = ({ icon, label, onClick }) => {
    return (
        <button
            className="flex items-center px-4 py-2 w-full text-left text-gray-700 hover:bg-gray-100"
            onClick={onClick}
        >
            {icon && <span className="mr-2">{icon}</span>}
            {label}
        </button>
    )
}

export default SidebarItem