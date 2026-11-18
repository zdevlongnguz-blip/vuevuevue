<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
      <RouterLink class="navbar-brand" to="/">My App</RouterLink>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div id="mainNav" class="collapse navbar-collapse">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <RouterLink class="nav-link" active-class="active" exact-active-class="active" to="/">Trang chủ</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" active-class="active" to="/products">Sản phẩm</RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
