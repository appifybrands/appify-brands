import sys
with open('src/app/my_components/Navbar.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('{mounted && (\n                <Image', '<Image')
content = content.replace('      />\n              )}\n            </div>', '      />\n            </div>')

old_btn = """            {mounted && (
              <button
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-105 hover:bg-black/5"
                style={{
                  border: "1px solid var(--border-medium)",
                  background: "transparent",
                  color: "var(--text-secondary)",
                }}
              >
                {isDark
                  ? <SunIcon size={16} strokeWidth={1.5} />
                  : <MoonIcon size={16} strokeWidth={1.5} />
                }
              </button>
            )}"""
new_btn = """            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-105 hover:bg-black/5"
              style={{
                border: "1px solid var(--border-medium)",
                background: "transparent",
                color: "var(--text-secondary)",
              }}
            >
              {mounted ? (
                isDark
                  ? <SunIcon size={16} strokeWidth={1.5} />
                  : <MoonIcon size={16} strokeWidth={1.5} />
              ) : (
                <div className="w-4 h-4" />
              )}
            </button>"""

if old_btn in content:
    content = content.replace(old_btn, new_btn)

with open('src/app/my_components/Navbar.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
print('Done!')
