import bcrypt

def encrypt_password(plain_password: str) -> str:
    # Genera el salt y encripta la clave
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(plain_password.encode('utf-8'), salt)
    return hashed.decode('utf-8')

if __name__ == "__main__":
    # Pides la clave por consola
    plain = input("Ingrese la contraseña a encriptar: ")
    hashed = encrypt_password(plain)
    print("\nContraseña encriptada (guardar en BD):\n")
    print(hashed)
