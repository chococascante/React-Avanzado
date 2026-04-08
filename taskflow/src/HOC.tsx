// Ejemplo 1
function withAuth(WrappedComponent) {
  return function AuthenticatedComponent(props) {
    const { user } = useAuth();
    if (!user) return <Navigate to="/login" />;
    return <WrappedComponent {...props} user={user} />;
  };
}

const ProtectedDashboard = withAuth(Dashboard);

// Cómo se usa el withAuth
return <ProtectedDashboard />;

// Ejemplo 2
const AuthRoute: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <h1>Cargando...</h1>;

  if (!user && !loading) return <Navigate to="/login" />;

  return <>{children}</>;
};

return (
  <AuthRoute>
    <WrappedComponent {...props} user={user} />
  </AuthRoute>
);
